import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handler untuk Preflight Request CORS
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// 1. GET: Ambil semua produk dari Supabase
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
        .from('products')
        .select('*');

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: 'Gagal mengambil data produk',
          error_message: error.message,
        },
        { status: 400, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Server Error',
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

// 2. POST: Tambah produk baru ke Supabase
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, price, stock } = body;

    const { data, error } = await supabaseAdmin
      .from('products')
      .insert([
        {
          title,
          price: Number(price),
          stock: Number(stock),
        },
      ])
      .select();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: 'Gagal menambahkan produk',
          error_message: error.message,
        },
        { status: 400, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Produk berhasil ditambahkan!',
        data: data[0],
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Server Error',
      },
      { status: 500, headers: corsHeaders }
    );
  }
}