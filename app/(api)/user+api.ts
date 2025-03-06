import { client } from "@/configs/NilePostgresConfig";

export async function POST(request: Request) {
    
    const { name, email, image } = await request.json();

    await client.connect();
    const result = await client.query(`
        INSERT INTO users (name, email, image)
        VALUES ('${name}', '${email}', '${image}')
    `);

    await client.end();

    return Response.json(result);
}

export async function GET(request: Request) {
    const email = new URL(request.url).searchParams.get('email');

    try {
        await client.connect();
        const result = await client.query(`
            SELECT * FROM users WHERE email = '${email}' LIMIT 1
        `);
        await client.end();
        return Response.json(result.rows[0]);
    } catch (error) {
        return Response.json({ error }, { status: 500 });        
    }

}
