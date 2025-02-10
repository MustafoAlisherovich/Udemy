'use client';

import { updateCourse } from '@/actions/course.action';
import { ICourse } from '@/app.types';
import FillLoading from '@/components/shared/fill-loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import UseToggleEdit from '@/hooks/use-toggle-edit';
import { BadgePlus, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';
import { useUploadThing } from '@/lib/uploadthing';

function PreviewImage( course: ICourse ) {
  const { state, onToggle } = UseToggleEdit();

  return (
    <Card>
      <CardContent className="relative p-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Replace Image</span>
          <Button size={'icon'} variant={'ghost'} onClick={onToggle}>
            {state ? <X /> : <BadgePlus />}
          </Button>
        </div>
        <Separator className="my-3" />

        {state ? (
          <Forms course={course} onToggle={onToggle} />
        ) : (
          <div className="relative h-72 w-full">
            <Image
              src={course.previewImage}
              alt={course.title}
              fill
              className="rounded-sm object-cover"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default PreviewImage;

interface FormsProps {
  course: ICourse;
  onToggle: () => void;
}

function Forms({ course, onToggle }: FormsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const pathname = usePathname();
  const { startUpload } = useUploadThing('imageUploader');

  async function handleUpload() {
    if (!selectedFile) return;
    setIsLoading(true);

    try {
      const uploadedFiles = await startUpload([selectedFile]);
      if (!uploadedFiles || !uploadedFiles[0]?.url) {
        throw new Error('Upload failed');
      }

      await updateCourse(course._id, { previewImage: uploadedFiles[0].url }, pathname);
      onToggle();
      toast.success('Successfully updated!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  }

  function onUpload(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setSelectedFile(files[0]);
  }

  return (
    <>
      {isLoading && <FillLoading />}
      <Input
        className="bg-secondary"
        type="file"
        accept="image/*"
        disabled={isLoading}
        onChange={onUpload}
      />
      <Button className='mt-3' onClick={handleUpload} disabled={isLoading || !selectedFile}>
        Upload Image
      </Button>
    </>
  );
}
