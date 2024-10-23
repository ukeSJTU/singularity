import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const generateUniqueSlug = (existingSlugs) => {
  let slug;
  do {
    slug = faker.lorem.slug();
  } while (existingSlugs.has(slug));
  existingSlugs.add(slug);
  return slug;
};

async function main() {
  // Create Tags
  const tags = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.tag.create({
        data: {
          id: faker.string.uuid(),
          name: faker.lorem.word({
            length: { min: 4, max: 8 },
            strategy: "closest",
          }),
        },
      })
    )
  );

  // Create Series
  const seriesSlugs = new Set();

  const seriesList = await Promise.all(
    Array.from({ length: 5 }).map(async () => {
      const randomTagId =
        Math.random() > 0.5
          ? tags[Math.floor(Math.random() * tags.length)].id
          : null;
      return prisma.series.create({
        data: {
          id: faker.string.uuid(),
          title: faker.lorem.sentence(),
          coverImageURL: faker.image.urlPicsumPhotos(),
          description: faker.lorem.paragraph(),
          slug: generateUniqueSlug(seriesSlugs),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
          published: faker.datatype.boolean(),
          views: faker.number.int({ min: 0, max: 1000 }),
          likes: faker.number.int({ min: 0, max: 1000 }),
          tagId: randomTagId,
        },
      });
    })
  );

  // Create Chapters
  const chapterSlugs = new Set();

  const chapters = await Promise.all(
    Array.from({ length: 10 }).map(() => {
      const seriesItem =
        seriesList[Math.floor(Math.random() * seriesList.length)];
      return prisma.chapter.create({
        data: {
          id: faker.string.uuid(),
          title: faker.lorem.sentence(),
          coverImageURL: faker.image.urlPicsumPhotos(),
          description: faker.lorem.paragraph(),
          slug: generateUniqueSlug(chapterSlugs),
          order: faker.number.int({ min: 1, max: 20 }),
          seriesId: seriesItem.id,
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        },
      });
    })
  );

  // Create Articles
  const articleSlugs = new Set();

  const articles = await Promise.all(
    Array.from({ length: 20 }).map(async () => {
      const associationType = Math.random();

      let chapterId = null;
      let seriesId = null;

      if (associationType < 0.33) {
        // Associate with a Chapter
        const chapter = chapters[Math.floor(Math.random() * chapters.length)];
        chapterId = chapter.id;
      } else if (associationType < 0.66) {
        // Associate directly with a Series
        const seriesItem =
          seriesList[Math.floor(Math.random() * seriesList.length)];
        seriesId = seriesItem.id;
      }
      // else, neither chapterId nor seriesId is set

      return prisma.article.create({
        data: {
          id: faker.string.uuid(),
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(),
          excerpt: faker.lorem.sentences(),
          coverImageURL: faker.image.urlPicsumPhotos(),
          readingTime: faker.number.int({ min: 1, max: 20 }),
          slug: generateUniqueSlug(articleSlugs),
          chapterId: chapterId,
          seriesId: seriesId,
          order: faker.number.int({ min: 1, max: 10 }),
          published: faker.datatype.boolean(),
          createdAt: faker.date.past(),
          publishedAt: faker.datatype.boolean() ? faker.date.past() : null,
          updatedAt: faker.date.recent(),
          views: faker.number.int({ min: 0, max: 1000 }),
          likes: faker.number.int({ min: 0, max: 1000 }),
        },
      });
    })
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
