import {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '@/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    return res.status(405).end();
  }

  const titleId = parseInt(req.query.id as string);

  try {
    const deletedTitle = await prisma.title.delete({
      where: {id: titleId},
    });

    if (deletedTitle) {
      res.status(200).json({message: 'Title deleted successfully.'});
    } else {
      res.status(404).json({error: 'Title not found.'});
    }
  } catch (error) {
    console.error('Error deleting title:', error);
    res
      .status(500)
      .json({error: 'An error occurred while deleting the title.'});
  } finally {
    await prisma.$disconnect();
  }
}
