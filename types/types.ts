// Product type
export interface Product {
id:number;
title:string;
price:number;
description:string;
category:string;
image:string;
rating:{
    rate:number;
    count:number;
}
}

// Category Type
export type Category = string;

//Favorit State 
export type FavoritesState = Set<number>;