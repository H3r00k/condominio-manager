export interface Post {
    id: string;
    title: string;
    content: string;
    createdAt: string
}

export type NewPostPayload = Omit<Post, 'id' | 'createdAt'>;