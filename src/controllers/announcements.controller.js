import prisma from "../../prisma/client.js";

export const getAllAnnouncements = async (req, res) => {
  const { search, sort = "newest", page = 1 } = req.query;

  const where = {};

  if (search && search.trim()) {
    where.title = {
      contains: search.trim(),
    };
  }

  let orderBy = { createdAt: "desc" };
  if (sort === "oldest") {
    orderBy = { createdAt: "asc" };
  }

  const perPage = 10;
  const pageNum = parseInt(page);
  const skip = (pageNum - 1) * perPage;

  const [announcements, total] = await Promise.all([
    prisma.announcement.findMany({
      where,
      skip,
      take: perPage,
      orderBy,
    }),
    prisma.announcement.count({ where }),
  ]);

  res.status(200).json({
    data: announcements,
    pagination: {
      total,
      page: pageNum,
      totalPages: Math.ceil(total / perPage),
      perPage,
    },
  });
};

export const getAnnouncementById = async (req, res) => {
  const { id } = req.params;

  const announcement = await prisma.announcement.findUnique({
    where: { id: parseInt(id) },
  });

  if (!announcement) {
    return res
      .status(404)
      .json({ error: "Announcement with provided id not found" });
  }

  res.status(200).json(announcement);
};

export const createAnnouncement = async (req, res) => {
  const { title, description, price, category, contactInfo } = req.body;

  const announcement = await prisma.announcement.create({
    data: {
      title,
      description,
      price,
      category,
      contactInfo,
    },
  });

  res.status(201).json(announcement);
};

export const updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, category, contactInfo } = req.body;

  const updateData = {
    title,
    description,
    price,
    category,
    contactInfo,
  };

  const announcement = await prisma.announcement.update({
    where: { id: parseInt(id) },
    data: updateData,
  });

  res.status(200).json(announcement);
};

export const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;

  await prisma.announcement.delete({
    where: { id: parseInt(id) },
  });

  res.status(204).end();
};
