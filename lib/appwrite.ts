// Import required dependencies from react-native-appwrite, expo-linking, and expo-web-browser
import { Client, Account, Avatars, OAuthProvider, Databases, Query } from 'react-native-appwrite';
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';

// Configuration object containing platform, endpoint and project ID
export const config = {
    platform: 'com.bhyte.reestate',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
}

// Initialize Appwrite client
export const client = new Client(); 

// Configure the client with endpoint, project ID and platform
client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)

// Create instances of Avatars and Account services
export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

// Function to handle OAuth login with Google
export async function login() {
    try {
        // Create redirect URI for OAuth flow
        const redirectURI = Linking.createURL('/');
        // Create OAuth2 token for Google provider
        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectURI);
        console.log(response);//

        // Check if response exists
        if (!response) throw new Error('Failed to login');

        // Open auth session in browser
        const browserResult = await openAuthSessionAsync(response.toString(), redirectURI);

        // Verify browser session was successful
        if (browserResult.type !== 'success') {
            throw new Error('Failed to login');
        }

        // Parse returned URL for secret and userId
        const url = new URL(browserResult.url);
        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();

        // Verify secret and userId exist
        if (!secret || !userId) throw new Error('Failed to login');
        
        // Create session with userId and secret
        const session = await account.createSession(userId, secret);

        // Verify session was created
        if (!session) throw new Error('Failed to login');

        return true;
    } catch (error) {
        // Log any errors and return false
        console.error(error);
        return false;
    }
}

// Function to handle logout
export async function logout() {
    try {
        await account.deleteSession('current');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Function to get current user
export async function getUser() {
    try {
        // First check if there's an active session
        try {
            const session = await account.getSession('current');
            if (!session) return null;
        } catch (e) {
            return null;
        }

        const response = await account.get();
        if (response.$id) {
            const userAvatar = await avatar.getInitials(response.name);
            return {
                ...response,
                avatar: userAvatar.toString(),
            }
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export async function getLatestProperties() {
    try {
        const result = await databases.listDocuments(
            config.databaseId!, 
            config.propertiesCollectionId!, 
            [Query.orderAsc('$createdAt'), 
            Query.limit(4)]
        );

        return result.documents;

    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getProperties({filter, query, limit}: {
    filter: string,
    query: string,
    limit?: number,
}) {
    try {
        const buildQuery = [Query.orderDesc('$createdAt')];

        if(filter && filter !== 'all') buildQuery.push(Query.equal('propertyTypes', filter));

        if (query) {
            buildQuery.push(
                Query.or([
                    Query.search('name', query),
                    Query.search('address', query),
                    Query.search('propertyTypes', query),
                ])
            )
        }

        if(limit) buildQuery.push(Query.limit(limit));

        const result = await databases.listDocuments(
            config.databaseId!, 
            config.propertiesCollectionId!, 
            buildQuery
        );
        return result.documents;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getPropertyById({ id }: { id: string }) {
    try {
        const result = await databases.getDocument(
            config.databaseId!,
            config.propertiesCollectionId!,
            id
        );
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

