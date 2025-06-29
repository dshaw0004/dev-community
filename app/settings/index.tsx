import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Chip, Text, TextInput } from 'react-native-paper';
import useTags from '@/store/useTags';

export default function Settings() {
    const [tag, setTag] = useState<string>('');
    const { tags, addTag, removeTag } = useTags();
    function handleAddTag() {
        if (tag === '') return;
        addTag(tag);
        setTag('');
    }
    return (
        <View style={styles.app}>
            <View style={styles.inputContainer}>
                <TextInput
                    label="select tag"
                    value={tag}
                    onChangeText={text => setTag(text)}
                    onSubmitEditing={handleAddTag}
                    mode='outlined'
                    right={<TextInput.Icon icon="plus-circle" onPress={handleAddTag} />}
                />
            </View>
            <Text variant="bodyLarge">Selected Tags:</Text>
            <View style={styles.tagsContainer}>
                {tags.map((tag) => (
                    <Chip
                        closeIcon={'close'}
                        key={tag}
                        onClose={() => removeTag(tag)}
                        mode='flat'
                        rippleColor={"cyan"}
                        style={{ width: 'auto' }}
                    >{tag}</Chip>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    app:{
        padding: 10
    },
    inputContainer:{
        marginBlock: 10,
    },
    tagsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 10,
    },
});