import { NextResponse } from "next/server";

export async function GET() {
  const spec = {
    openapi: "3.0.0",
    info: {
      title: "Maldonado Furniture API",
      version: "1.0.0",
      description: "API documentation for Maldonado Furniture E-commerce",
    },
    paths: {
      "/api/products": {
        get: {
          summary: "List products",
          parameters: [
            {
              name: "q",
              in: "query",
              description: "Search query",
              schema: { type: "string" },
            },
          ],
          responses: {
            200: {
              description: "List of products",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Product" },
                  },
                },
              },
            },
          },
        },
      },
      "/api/auth/register": {
        post: {
          summary: "Register a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "User registered" },
          },
        },
      },
    },
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            price: { type: "number" },
          },
        },
      },
    },
  };

  return NextResponse.json(spec);
}
