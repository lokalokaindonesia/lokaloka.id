export default async (req, res) => {
    const getProductCategories = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product-categories`)
    const data = getProductCategories.json()
    return res.json(data)
}