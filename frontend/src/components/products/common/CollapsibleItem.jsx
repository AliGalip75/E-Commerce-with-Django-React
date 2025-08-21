import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Button } from '@/components/ui/button';

const CollapsibleItem = ({ id, title, content, openId, setOpenId }) => {
  const isOpen = openId === id;

  return (
    <Collapsible className="flex w-[350px] flex-col gap-2" open={isOpen}>
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="text-sm font-semibold">{title}</h4>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setOpenId(isOpen ? null : id)}
          >
            {isOpen ? <IoIosArrowUp className="size-6" /> : <IoIosArrowDown className="size-6" />}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        {content.map((item, index) => (
          <div key={index} className="rounded-md border px-4 py-2 font-mono text-sm">
            {item}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleItem;