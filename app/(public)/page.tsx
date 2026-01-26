"use client";
import { ProductCard } from "@/components/topup/product-card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getListGame } from "./services/dashboard.services";

type Game = {
  id: number;
  gameName: string;
  slug: string;
  urlGamesImage: string;
  urlGameBanner: string;
  status: boolean;
  category: string;
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const {
    data: listGame,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["games"],
    queryFn: getListGame,
  });

  //mapping category
  const categories = () => {
    if (!Array.isArray(listGame?.data?.data?.data)) return [];
    return listGame?.data?.data?.data.map((gameItem: { category: string }) => {
      return {
        name: gameItem.category
          .toLowerCase()
          .split("_")
          .map((word: string) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" "),
      };
    });
  };

  //mapping list game popular
  const popularGames = listGame?.data?.data?.popular || [];

  //mapping games by category
  const normalizeString = (str: string) => str.replace(/_/g, " ").toLowerCase();

  const gameCategoryActive = (listGame?.data?.data?.data || []).filter(
    (gameItem: Game) =>
      normalizeString(activeCategory) === "semua" ||
      normalizeString(gameItem.category) === normalizeString(activeCategory),
  );

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-primary/5 py-12 md:py-20 rounded-b-[3rem]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            TOP UP GAME <br className="hidden md:block" />
            <span className="text-primary">TERMURAH, TERCEPAT!</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Platform top up terpercaya untuk berbagai game favoritmu. Proses
            instan, pembayaran aman, dan harga bersahabat.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="rounded-full  cursor-pointer px-8 font-bold text-md"
            >
              Mulai Belanja
            </Button>
            <Link href="/check-transaction">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full cursor-pointer px-8 font-bold text-md"
              >
                Cek Transaksi
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Filter (Visual Only for now) */}
      <section className="container mx-auto px-4 mt-12 mb-8">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          <Button
            variant={activeCategory === "Semua" ? "default" : "secondary"}
            className=" cursor-pointer rounded-full"
            onClick={() => setActiveCategory("Semua")}
          >
            Semua
          </Button>
          {categories().map((cat: { name: string }) => (
            <Button
              key={cat.name}
              variant={activeCategory === cat.name ? "default" : "secondary"}
              className="rounded-full cursor-pointer whitespace-nowrap"
              onClick={() => setActiveCategory(cat.name)}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4">
        <h2 className="font-bold text-2xl mb-6">Populer Sekarang</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {popularGames.map((product: Game) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.gameName}
              slug={product.slug}
              image={product.urlGameBanner}
            />
          ))}
        </div>
        <h2 className="font-bold text-2xl mb-6">{activeCategory}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {gameCategoryActive.map((product: Game) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.gameName}
              slug={product.slug}
              image={product.urlGamesImage}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
