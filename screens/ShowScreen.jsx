import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Image, StyleSheet, Dimensions, FlatList, View  } from 'react-native';
import PostService from '../services/PostService';
import RenderHtml from 'react-native-render-html';

export default function ShowScreen({ route, navigation }) {
    const { postId } = route.params;
    const [post, setPost] = useState(null);
    const { width } = Dimensions.get('window');

    useEffect(() => {
        if (post) {
            navigation.setOptions({
                title: post.title, // Met à jour le titre avec le titre de l'article
                headerTitleStyle: {
                    color: '#D8BD8A'
                },
            });
        }
    }, [post, navigation]);

    useEffect(() => {
        PostService.getPostById(postId)
            .then(data => {
                setPost(data);
            })
            .catch(error => {
                console.error("Erreur lors du chargement de l'article:", error);
            });
    }, [postId, navigation]);
    

    if (!post) {
        return <Text>Chargement de l'article...</Text>;
    }

    // Fonction pour rendre chaque image dans le FlatList
    const renderImage = ({ item }) => (
        <Image source={{ uri: `${PostService.apiUrl}${item}` }} style={{ width: width, height: 200, resizeMode: 'cover' }} />
        );

    // Vérifiez si post.image est un tableau et non vide
    const hasImages = Array.isArray(post.image) && post.image.length > 0;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.containPage}>
            {hasImages && (
                <View style={styles.imageContainer}>
                    <FlatList
                        data={post.image}
                        renderItem={renderImage}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            )}
            <RenderHtml contentWidth={width} source={{ html: post.content }}/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    containPage: {
        marginTop: 50,
    },
    imageContainer: {
        height: 200, // Ajustez la hauteur selon vos besoins
        marginBottom: 10,
    },
    image: {
        height: 200,
        resizeMode: 'cover',
        marginRight: 10, // Espacement entre les images
    },
    
    
});
