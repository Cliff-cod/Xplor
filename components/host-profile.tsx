'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MessageSquare, Heart } from 'lucide-react';

interface HostProfileProps {
  name: string;
  bio: string;
  avatar: string;
  responseRate: number;
  joinDate: string;
  totalListings: number;
}

export function HostProfile({
  name,
  bio,
  avatar,
  responseRate,
  joinDate,
  totalListings,
}: HostProfileProps) {
  return (
    <Card className="card-premium border border-primary/20 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <CardHeader className="pb-4">
        <h3 className="text-xl font-bold text-foreground">Meet Your Host</h3>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Host Info */}
        <div className="flex items-start gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/30">
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <h4 className="text-lg font-bold text-foreground">{name}</h4>
            <p className="text-sm text-muted-foreground">Verified Host</p>
            <p className="text-sm text-foreground mt-2 line-clamp-2">{bio}</p>
          </div>
        </div>

        {/* Host Stats */}
        <div className="grid grid-cols-3 gap-3 py-4 border-y border-primary/20">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{responseRate}%</div>
            <div className="text-xs text-muted-foreground">Response Rate</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">Joined</div>
            <div className="text-xs text-muted-foreground">{joinDate}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{totalListings}</div>
            <div className="text-xs text-muted-foreground">Listings</div>
          </div>
        </div>

        {/* Description */}
        <div className="py-2">
          <p className="text-sm text-foreground leading-relaxed">
            {name} has been sharing authentic African experiences for over 3 years. Known for attention to detail and creating memorable moments for guests from around the world.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold rounded-lg"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Host
          </Button>
          <Button
            variant="outline"
            className="border-primary/50 hover:bg-primary/10 text-primary rounded-lg"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
