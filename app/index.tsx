import {View, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, NativeSyntheticEvent, NativeScrollEvent, FlatList} from 'react-native';
import {Text, ActivityIndicator} from 'react-native-paper';
import {useEffect, useState, useCallback} from 'react';
import {sampleArticles} from "@/constants/sampleArticles";
import {router} from 'expo-router';
import {Card, Surface} from 'react-native-paper';


interface User {
    name: string;
    username: string;
    twitter_username: string;
    github_username: string;
    user_id: number;
    website_url: string;
    profile_image: string;
    profile_image_90: string;
}

interface FlareTag {
    name: string;
    bg_color_hex: string;
    text_color_hex: string;
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
    tag_list: string[];
    tags: string;
    user: User;
    flare_tag: FlareTag;
}

function removeDuplicateArticles(arr: Article[]){
    const newArr: Array<Article> = arr.filter((item: Article, index:number) =>{
        let isUnique:boolean = true;
          for(let i = index+1; i<arr.length; ++i){
            if(arr[i].id == item.id){
                    isUnique = false;
                    break;
                }
          }
            return isUnique;
        })
    return newArr;    
}

function Art({article}: {article: Article}){
    return <Surface elevation={5}
                key={article.id} 
                >
                    <Card style={styles.postCard}
                    onPress={() => {
                        router.push(
                            `/article?username=${article.user.username}&slug=${article.slug}&id=${article.id}` as any
                        )
                    }}
                    >
                    <Card.Cover source={{uri: article.cover_image}} style={{borderBottomWidth: 2, borderColor: 'grey'}}/>
                    <Card.Content>
                        <Text variant="titleLarge" style={{fontWeight: "bold"}}>{article.title}</Text>
                        <Text variant="bodyMedium">{article.description}</Text>
                        <Text variant={"bodySmall"}>tags: {article.tag_list.join(', ')}</Text>
                        <Text variant={"bodySmall"}>Posted by - {article.user.name} on {article.readable_publish_date}</Text>
                    </Card.Content>
                </Card>
                </Surface>
}


export default function App(){
    const [articles, setArticles] = useState<Array<Article>>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = useCallback(async () => {
        setRefreshing(true);
        try {
          const response = await fetch(`https://dev.to/api/articles/latest?page=${pageNumber}&per_page=50`);
          const result = await response.json() as Article[];
          if(pageNumber === 1){
            setArticles(result)
          }else{
            const noneDuplicateArticles: Array<Article> = removeDuplicateArticles([...articles, ...result]);
            setArticles(noneDuplicateArticles);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setRefreshing(false);
        }
      }, [pageNumber]);

    const handleRefresh = async () => {
        setPageNumber(1);
    };

    useEffect(()=>{
        fetchData();
    },[fetchData])

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20 && !refreshing) {
          setPageNumber(prevPage => prevPage + 1);
        }
    };
    const renderFooter = () => {
        return refreshing ? (
        <View style={{ padding: 10 }}>
            <ActivityIndicator animating={true} size={36} color="#0000ff" />
        </View>
        ) : null;
    };
    // <ScrollView
    // refreshControl={
        //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        //   }
        //   onScroll={handleScroll} scrollEventThrottle={16}
        // >
        return (
            <FlatList 
                data={articles}
                renderItem={({item}:{item: Article}) => (<Art article={item}/>)}
                keyExtractor={(item: Article) => String(item.id)}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                onEndReached={()=> {setPageNumber(prev => prev+1)}}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
    )
}

const styles = StyleSheet.create({
    postCard: {
        marginBlock: 16,
        marginInline: 10,
        borderColor: 'grey',
        borderWidth: 1,
    },
    imageContainer:{
        height: 200
    },
    postInfoContainer:{
        height: '50%',
    },
    image: {
        flex: 1,
        height: '50%',
        backgroundColor: '#0553',
    },
})