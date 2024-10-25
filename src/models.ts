export interface IUser {
    id: string;
    avatarUrl: string;
    name: string;
    company: string;
    isVerified: boolean;
    status: string | undefined;
    role: string | undefined;
}

export interface IPost {
    id: string;
    cover: string;
    title: string;
    view: number;
    comment: number;
    share: number;
    favorite: number;
    createdAt: Date;
    author: {
        name: string;
        avatarUrl: string;
    };
}

export interface IAccount {
    displayName: string;
    email: string;
    photoURL: string;
    role: string | undefined;
}

export interface IProduct {
    productId: number;
    productName: string;
    description: string;
    imageUrl: string;
    categoryId: number;
    categoryName: string;
    price: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
  }

export interface NavItemConfig {
    title: string;
    path: string;
    icon: JSX.Element;
    info?: string;
    children?;
}

export interface News {
    image;
    title;
    description;
    postedAt;
}

export interface Site {
    icon;
    value;
    name;
}

export interface HeaderLabel {
    id: string;
    label: string;
    alignRight: boolean;
}
