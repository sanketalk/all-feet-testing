import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Product } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const products: Product[] = body.products;

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: products must be a non-empty array" },
        { status: 400 }
      );
    }

    const version = new Date().toISOString();
    const filePath = path.join(process.cwd(), "src", "data", "products.ts");

    // Format products as clean TypeScript code
    const fileContent = `import { Product } from "@/types";

export const PRODUCTS_VERSION = "${version}";

export const INITIAL_PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};
`;

    await fs.promises.writeFile(filePath, fileContent, "utf-8");

    return NextResponse.json({
      success: true,
      message: `Successfully synchronized ${products.length} products to src/data/products.ts`,
      count: products.length,
      version,
    });
  } catch (error: any) {
    console.error("Save products error:", error);
    return NextResponse.json(
      { error: "Failed to write products to code file: " + error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "products.ts");
    const stats = await fs.promises.stat(filePath);
    return NextResponse.json({
      success: true,
      lastModified: stats.mtime.toISOString(),
      filePath: "src/data/products.ts",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
