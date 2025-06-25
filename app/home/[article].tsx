import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View, Share } from 'react-native';
import { Text, ActivityIndicator, MD2Colors, Icon, Avatar } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { Image } from 'expo-image'
import { useLocalSearchParams, useGlobalSearchParams, Link, useRouter } from 'expo-router';
import { blurhash } from "@/constants/constants";
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

export default function Article() {
    const { username, slug, id } = useGlobalSearchParams();
    const [article, setArticle] = useState<Article>();
    const navigation = useNavigation();
    const router = useRouter();
    const handleShare = async () => {
        if (!article) {
            alert('Please wait until the post is loaded!')
            return;
        }
        try {
            await Share.share({
                message: article.url,
                url: article.url,
                title: article.title
            }, {
                dialogTitle: article.title
            });
        } catch (e) {
            console.error(e)
            alert('Sharing facility is not available in your device.')
        }

    };


    useEffect(() => {
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
    }, [])
    if (!article) {
        return <ActivityIndicator animating={true} color={MD2Colors.red800} />
    }
    else {
        return (
            <ScrollView>
                {article.cover_image === null ? <View></View> : <View style={styles.imageContainer}>

                    <Image placeholder={{ blurhash }} source={{ uri: article.cover_image }} style={styles.image} contentFit='contain' />
                </View>}
                <View style={{paddingBlock: 16}}>
                    <TouchableOpacity onPress={()=> router.back()} hitSlop={52}>
                        <Icon source={"arrow-left"} size={36} />
                    </TouchableOpacity>
                </View>
                <View style={{ paddingInline: 16 }}>
                    <View style={styles.userInfoContainer}>
                        <View>
                            <Avatar.Image size={45} source={{ uri: article.user.profile_image }} />
                        </View>
                        <View style={{ flexGrow: 2 }}>
                            <Text variant={'titleLarge'} style={{ fontWeight: 'bold' }}>{article.user.name}</Text>
                            <Text variant={"bodySmall"}>Posted on {article.readable_publish_date}</Text>
                        </View>
                    </View>
                    <View >
                        <Text variant={"headlineLarge"} style={styles.articleTitle}>{article?.title}</Text>
                        <Text variant={"bodySmall"}>
                            {article.tag_list.length > 0 && Array.isArray(article.tag_list) ? article.tag_list.join(', ') : article.tag_list}
                        </Text>
                    </View>
                    <Text style={{ textAlign: 'right' }}>
                        <TouchableOpacity onPress={handleShare} hitSlop={36}>
                            <Icon source={'share'} size={25} />
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

    imageContainer: {
        width: width,
        height: width * 0.42,
        backgroundColor: '#0553',
        marginBottom: 10
    },

    image: {
        height: width * 0.42,
        width: width,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        columnGap: 10,
    },
    articleTitle: {
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10
    }
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