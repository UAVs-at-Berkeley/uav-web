import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react"

interface AccordionListItem {
  title: string
  content: string
}

interface AccordionListProps {
  items: AccordionListItem[]
  className?: string
}

export default function AccordionList({ items, className }: AccordionListProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

  return (
    <Accordion
      className={className}
      multiple
      value={openItems}
      onValueChange={(value) => setOpenItems(Array.isArray(value) ? value : [])}
    >
      {items.map((item, index) => (
        <AccordionItem value={`item-${index}`} key={item.title}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>
            <p>{item.content}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
