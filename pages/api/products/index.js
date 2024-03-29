import axios from 'axios';

export default async (req, res) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  console.log(process.env.NEXT_PUBLIC_API_URL, process.env);
  if (!data) {
    return res.json({ messages: 'no products' });
  }

  return res.json(data);
};
