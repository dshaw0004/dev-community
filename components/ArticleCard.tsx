import { Surface, Card, Text} from "react-native-paper"
import { View, StyleSheet } from "react-native"
import {router} from 'expo-router';
import type { Article } from "@/types/article"

interface Props{
    article: Article
}

export default function ArticleCard({article}: Props){
    return <Surface elevation={5}
                key={article.id} 
                >
                    <Card style={styles.postCard}
                    onPress={() => {
                        router.push(
                            `/home/article?username=${article.user.username}&slug=${article.slug}&id=${article.id}` as any
                        )
                    }}
                    >
                    {article.cover_image === null ? <View style={{height: 16}}></View> : <Card.Cover source={{uri: article.cover_image}} style={{borderBottomWidth: 2, borderColor: 'grey'}}/>}
                    <Card.Content>
                        <Text variant="titleLarge" style={{fontWeight: "bold"}}>{article.title}</Text>
                        <Text variant="bodyMedium">{article.description}</Text>
                        <Text variant={"bodySmall"}>tags: {article.tag_list.join(', ')}</Text>
                        <Text variant={"bodySmall"}>Posted by - {article.user.name} on {article.readable_publish_date}</Text>
                    </Card.Content>
                </Card>
                </Surface>
}

const styles = StyleSheet.create({
    postCard: {
        marginBlock: 16,
        marginInline: 10,
        borderColor: 'grey',
        borderWidth: 1,
    },
})