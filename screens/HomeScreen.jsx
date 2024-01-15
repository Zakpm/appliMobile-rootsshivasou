import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure } from '../reducers/postAction';
import PostService from '../services/PostService';
import  RenderHtml  from 'react-native-render-html'

export default function HomeScreen({ navigation }) {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const [refreshing, setRefreshing] = useState(false);
    const { width } = Dimensions.get('window'); // Obtenez la largeur de l'écran


    const loadPosts = () => {
        dispatch(fetchPostsRequest());
        PostService.getAllPosts()
            .then(data => {
                dispatch(fetchPostsSuccess(data));
            })
            .catch(error => {
                dispatch(fetchPostsFailure(error.message));
            })
            .finally(() => setRefreshing(false)); // Assurez-vous de mettre refreshing à false une fois les données chargées
    };

    useEffect(() => {
        loadPosts();
        dispatch(fetchPostsRequest());
        PostService.getAllPosts()
            .then(data => {
                dispatch(fetchPostsSuccess(data));
            })
            .catch(error => {
                dispatch(fetchPostsFailure(error.message));
            });
    }, [dispatch]);
    

    const onRefresh = () => {
        setRefreshing(true);
        loadPosts();
    };

    const renderPost = ({ item }) => {
        // Déterminez si le post a une image valide
        const hasImage = item.image && item.image.length > 0;
        const imageSource = hasImage ? { uri: `${PostService.apiUrl}${item.image[0]}` } : null;
    
        return (
            <View style={styles.card}>
                {hasImage && <Image source={imageSource} style={styles.image} />}
                <Text style={styles.title}>{item.title}</Text>
                <RenderHtml contentWidth={width} source={{ html: item.content.substring(0, 50)}}/>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('ShowScreen', { postId: item.id })}
                >
                    <Text style={styles.buttonText}>Lire</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.containPage}>
            <FlatList 
                data={posts}
                renderItem={renderPost}
                keyExtractor={item => item.id.toString()}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    containPage: {
        marginTop: 20,
    },
    card: {
        margin: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
    },
    content: {
        fontSize: 14,
        color: '#333',
    },
    button: {
        backgroundColor: '#753742',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
});
