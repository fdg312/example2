"use client"

import { ProductCard } from "@/components/productcard/ProductCard";
import { CategoryService } from "@/services/category";
import { IAddResponse } from "@/types/add.interface";
import { ICategory } from "@/types/category.interface";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Mulish } from 'next/font/google'
import { AddsDiv } from "@/components/addsDiv/addsDiv";

const mulish = Mulish({ subsets: ['cyrillic'] })

const CategoryPage = ({ params }: { params: { slug: string } }) => {
    const [adds, setAdds] = useState<IAddResponse[]>([])

    useEffect(() => {
        async function fetchData() {
            const data = await CategoryService.getBySlug(params.slug)
            
            setAdds(data)
        }

        fetchData()
    }, [])
    
    return (
        <main className="container">
            <div className="wrapper mt-6">
                <h2 className={'text-center text-[36px] text-[#555555] mb-8 font-bold' + ' ' + mulish.className}>Объявления в категории {(adds[0]?.subcategory?.name)?.toLowerCase()}</h2>
                <AddsDiv adds={adds} />
            </div>
        </main>
    )
}

export default CategoryPage;