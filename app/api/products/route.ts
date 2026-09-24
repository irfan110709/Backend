import { NextResponse } from 'next/server';

// Contoh database sementara di memory (Ganti dengan Prisma/Kysely/Database kamu)
let products = [
  { id: '1', title: 'Mouse Wireless', price: 150000, stock: 10 },
  { id: '2', title: 'Keyboard Mechanical', price: 450000, stock: 5 },
];

// GET: Ambil semua data produk
export async function GET() {
  return NextResponse.json({
    success: true,
    data: products,
  });
}

// POST: Tambah produk baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, price, stock } = body;

    const newProduct = {
      id: Date.now().toString(),
      title,
      price: Number(price),
      stock: Number(stock),
    };

    products.push(newProduct);

    return NextResponse.json({
      success: true,
      message: 'Produk berhasil ditambahkan!',
      data: newProduct,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Gagal menambah produk',
    }, { status: 500 });
  }
}