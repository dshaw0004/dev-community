import {Dimensions, ScrollView, StyleSheet, TouchableOpacity, View, Share} from 'react-native';
import {Text, ActivityIndicator, MD2Colors, Icon} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {Image} from 'expo-image'
import { useLocalSearchParams, useGlobalSearchParams, Link } from 'expo-router';
import {blurhash} from "@/constants/constants";
import Markdown from 'react-native-markdown-display';
import { useNavigation } from 'expo-router';

interface User {
    name: string;
    username: string;
    twitter_username: string | null;
    github_username: string | null;
    user_id: number;
    website_url: string | null;
    profile_image: string;
    profile_image_90: string;
}

interface Article {
    type_of: string;
    id: number;
    title: string;
    description: string;
    readable_publish_date: string;
    slug: string;
    path: string;
    url: string;
    comments_count: number;
    public_reactions_count: number;
    collection_id: number | null;
    published_timestamp: string;
    language: string;
    subforem_id: number;
    positive_reactions_count: number;
    cover_image: string;
    social_image: string;
    canonical_url: string;
    created_at: string;
    edited_at: string | null;
    crossposted_at: string | null;
    published_at: string;
    last_comment_at: string;
    reading_time_minutes: number;
    tag_list: string;
    tags: string[];
    body_html: string;
    body_markdown: string;
    user: User;
}


const { width } = Dimensions.get('window');

export default function Article(){
    const {username, slug, id} = useGlobalSearchParams();
    const [article, setArticle] = useState<Article>();
    const navigation = useNavigation();
    const handleShare = async () => {
        if(!article){
            alert('Please wait until the post is loaded!')
            return;
        }
        try{
            await Share.share({
                message: article.url,
                url: article.url,
                title: article.title
            }, {
                dialogTitle: article.title
            });
        }catch(e){
            console.error(e)
            alert('Sharing facility is not available in your device.')
        }

    };
        

    useEffect(()=>{
        (async () => {
            const req = await fetch(`https://dev.to/api/articles/${id}`);
            const res = await req.json() as Article;
            // console.log(res.body_html)
            navigation.setOptions({
                title: res.title
            })
            // console.log(res);
            setArticle(res);
        })()
    },[])
    if (!article){
        return <ActivityIndicator animating={true} color={MD2Colors.red800} />
    }
    else {
        return (
            <ScrollView>
                <View style={styles.imageContainer}>

                    <Image placeholder={{blurhash}} source={{uri: article.cover_image}} style={styles.image} contentFit='contain'/>
                </View>
                <View style={{paddingInline: 16}}>
                    <Text variant={"titleLarge"} style={{fontWeight: 'bold'}}>{article?.title}</Text>
                    <Text variant={"bodySmall"}>tags: {article.tag_list}</Text>
                    <Text variant={"bodySmall"}>Posted by - {article.user.name} on {article.readable_publish_date}</Text>
                    <Text style={{textAlign: 'right'}}>
                        <TouchableOpacity onPress={handleShare} hitSlop={36}>
                            <Icon source={'share'} size={25}/>
                        </TouchableOpacity>
                    </Text>
                    <Markdown style={markdownStyles}>
                        {article.body_markdown}
                    </Markdown>
                </View>

            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({

    imageContainer:{
        width: width,
        height: width * 0.42,
        backgroundColor: '#0553',
    },

    image: {
        height: width * 0.42,
        width: width,
    },
})
const markdownStyles = {
        code_inline: {
            paddingBlock: 0,
            paddingInline: 4,
            fontFamily: 'SpaceMono'
        },
        code_block: {
            fontFamily: 'SpaceMono'
        }
    }