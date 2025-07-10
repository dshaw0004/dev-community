import { View, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, NativeSyntheticEvent, NativeScrollEvent, FlatList, SafeAreaView } from 'react-native';
import * as Network from 'expo-network';
import { Text, ActivityIndicator } from 'react-native-paper';
import { useEffect, useState, useCallback } from 'react';
import ArticleCard from '@/components/ArticleCard';

import type { Article } from '@/types/article';
import useTags from '@/store/useTags';

function removeDuplicateArticles(arr: Article[]) {
    const newArr: Array<Article> = arr.filter((item: Article, index: number) => {
        let isUnique: boolean = true;
        for (let i = index + 1; i < arr.length; ++i) {
            if (arr[i].id == item.id) {
                isUnique = false;
                break;
            }
        }
        return isUnique;
    })
    return newArr;
}

enum ArticleStateEnum {
    FRESH = 'fresh',
    RISING = 'rising',
    ALL = 'all'
}


export default function App() {
    const { tags } = useTags();
    const [articles, setArticles] = useState<Array<Article>>([]);
    const [articleState, setArticleState] = useState<ArticleStateEnum>(ArticleStateEnum.FRESH);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [refreshing, setRefreshing] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string>('');

    const fetchData = useCallback(async () => {
        setRefreshing(true);
        const networkInfo = await Network.getNetworkStateAsync();
        if (!networkInfo.isConnected) {
            setRefreshing(false)
            setErrorMsg('No internet connection');
            return;
        }
        try {
            const response = await fetch(`https://dev.to/api/articles/?page=${pageNumber}&per_page=50&tags=${tags.join(', ')}&state=${articleState}`);
            const result = await response.json() as Article[];
            if (pageNumber === 1) {
                setArticles(result)
            } else {
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

    useEffect(() => {
        fetchData();

    }, [])

    useEffect(() => {
        setArticles([]);
        setPageNumber(1);
        fetchData();
    }, [articleState])

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
    if (errorMsg) {
        return <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text variant='headlineLarge' style={{ textDecorationLine: 'underline' }}>{errorMsg}</Text>
        </SafeAreaView>
    }
    return (
            <ScrollView style={{ flex: 1 }}
>
                <View style={{ flexDirection: 'row', columnGap: 10, padding: 10 }}>
                    {
                        ['fresh', 'rising'].map(state => (
                            <TouchableOpacity
                                onPress={() => setArticleState(state as ArticleStateEnum)}
                                key={state}
                            >
                                <Text style={{ fontWeight: state === articleState ? 'bold' : 'normal', color: state === articleState ? 'black' : 'gray', fontSize: 16 }}>{state == 'fresh' ? 'Latest' : 'Top'}</Text>
                            </TouchableOpacity>

                        ))
                    }
                </View>
                <FlatList
                    data={articles}
                    renderItem={({ item }: { item: Article }) => (<ArticleCard article={item} />)}
                    keyExtractor={(item: Article) => String(item.id)}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    onEndReached={() => { setPageNumber(prev => prev + 1) }}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                />
            </ScrollView>
    )
}

const styles = StyleSheet.create({})