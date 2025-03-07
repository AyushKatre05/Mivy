import { client } from "@/configs/NilePostgresConfig";

export async function GET(request:Request){
    await client.connect();
    const result = await client.query(`select * from clubs order by name asc;`);
    await client.end();
    return Response.json(result.rows)
}