import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Create Tags
  const tags = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.tag.create({
        data: {
          id: faker.string.uuid(),
          name: faker.lorem.word(),
        },
      })
    )
  );

  // Create Series
  const series = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.series.create({
        data: {
          id: faker.string.uuid(),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
          published: faker.datatype.boolean(),
          order: faker.number.int({ min: 0, max: 10 }),
        },
      })
    )
  );

  // Create Chapters
  const chapters = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.chapter.create({
        data: {
          id: faker.string.uuid(),
          title: faker.lorem.sentence(),
          order: faker.number.int({ min: 1, max: 20 }),
          description: faker.lorem.paragraph(),
          seriesId: series[Math.floor(Math.random() * series.length)].id,
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
          published: faker.datatype.boolean(),
        },
      })
    )
  );

  // Create Articles
  const articles = await Promise.all(
    Array.from({ length: 20 }).map(() =>
      prisma.article.create({
        data: {
          id: faker.string.uuid(),
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(),
          excerpt: faker.lorem.sentence(),
          coverImage: faker.image.url(),
          readingTime: faker.number.int({ min: 1, max: 20 }),
          slug: faker.lorem.slug(),
          chapterId:
            Math.random() > 0.5
              ? chapters[Math.floor(Math.random() * chapters.length)].id
              : null,
          seriesId:
            Math.random() > 0.5
              ? series[Math.floor(Math.random() * series.length)].id
              : null,
          published: faker.datatype.boolean(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
          views: faker.number.int({ min: 0, max: 1000 }),
          likes: faker.number.int({ min: 0, max: 1000 }),
          order: faker.number.int({ min: 0, max: 10 }),
        },
      })
    )
  );

  // Link Articles to Tags
  for (const article of articles) {
    await prisma.article.update({
      where: { id: article.id },
      data: {
        tags: {
          connect: Array.from({ length: Math.floor(Math.random() * 5) }).map(
            () => ({
              id: tags[Math.floor(Math.random() * tags.length)].id,
            })
          ),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
