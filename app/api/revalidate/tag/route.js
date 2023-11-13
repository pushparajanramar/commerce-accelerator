import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function GET(request) {
    const tag = request.nextUrl.searchParams.get('tag')
    if (!tag) {
        return NextResponse.json({ message: 'Missing path param' }, { status: 400 })
    }
    revalidateTag(tag)
    return NextResponse.json({ revalidated: true, now: Date.now() })
}