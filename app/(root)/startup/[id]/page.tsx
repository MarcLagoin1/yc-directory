import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_DETAIL_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import markdownit from "markdown-it";

const md = markdownit();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUP_DETAIL_QUERY, { id });

  const parsedContent = md.render(post?.pitch || "");

  if (!post) return notFound();

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading maw-w-3xl">{post.description}</p>
      </section>

      <section className="section_container">
        <img
          className="w-full h-auto rounded-xl"
          src={post.image}
          alt="thumbnail"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-3 items-center"
            >
              <Image
                alt="User picture"
                src={post.author.image}
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author.name}
                </p>
              </div>
            </Link>

            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose break-all font-work-sans"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result"> No pitch provided...</p>
          )}
        </div>
        <hr className="divider" />
      </section>
    </>
  );
};

export default page;
