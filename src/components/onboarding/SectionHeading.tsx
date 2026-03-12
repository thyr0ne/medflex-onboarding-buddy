import { useState } from 'react';
import { MessageSquarePlus, MessageSquareText } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  commentKey: string;
  comment: string;
  onCommentChange: (key: string, value: string) => void;
  className?: string;
  as?: 'h3' | 'h2';
}

const SectionHeading = ({
  title,
  commentKey,
  comment,
  onCommentChange,
  className,
  as: Tag = 'h3',
}: SectionHeadingProps) => {
  const [open, setOpen] = useState(false);
  const hasComment = comment && comment.trim().length > 0;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Tag className={cn(
        Tag === 'h3' ? 'text-lg font-semibold text-foreground' : 'text-2xl font-bold text-foreground',
      )}>
        {title}
      </Tag>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              'p-1 rounded transition-colors shrink-0',
              hasComment
                ? 'text-primary hover:bg-primary/10'
                : 'text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted'
            )}
            title="Kommentar hinzufügen"
          >
            {hasComment ? (
              <MessageSquareText className="w-4 h-4" />
            ) : (
              <MessageSquarePlus className="w-4 h-4" />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">
              Interner Kommentar zu „{title}"
            </p>
            <Textarea
              value={comment}
              onChange={(e) => onCommentChange(commentKey, e.target.value)}
              placeholder="Weitere Informationen oder Anmerkungen für das Team…"
              rows={3}
              className="text-sm"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SectionHeading;
