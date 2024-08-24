/**
 * v0 by Vercel.
 * @see https://v0.dev/t/3kPj7MkguJk
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card } from "@/components/ui/card"

export default function Component({ headshotUrl, name, execRole, about }) {
	return (
		<Card className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg">
			<img src={headshotUrl} alt="Card Image" width={300} height={300} className="w-full aspect-square object-cover" />
			<div className="p-4 bg-background">
				<h3 className="text-lg font-bold">{name}</h3>
                {execRole && <h2 className="text-sm mb-2">{execRole}</h2>}
				{about && <p className="text-muted-foreground text-sm">{about}</p>}
			</div>
		</Card>
	)
}
