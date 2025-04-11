

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'



function DashCard({ title, summary, icon }: { title: string, summary: string, icon: string }) {
    return (
        <Card className="w-full h-full bg-muted/50 aspect-video rounded-xl p-4">
            <CardHeader>
                <CardTitle className="">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                <div className=" ">{summary}</div>
                <div className="text-gray-500">{icon}</div>
            </CardContent>
        </Card>
    )
}

export default DashCard