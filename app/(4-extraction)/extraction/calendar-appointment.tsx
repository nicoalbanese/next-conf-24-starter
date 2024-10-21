import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface AppointmentDetailsProps {
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  attendees?: string[];
  emoji?: string;
}

export function AppointmentDetails({
  title,
  date,
  startTime,
  endTime,
  location,
  attendees,
  emoji,
}: AppointmentDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-bold">Title</h3>
          <p className="text-sm">
            {title || "No title set"} {emoji}
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-bold">Date & Time</h3>
          <p className="text-sm">
            {date ? `${date}, ` : ""}
            {startTime && endTime
              ? `${startTime} - ${endTime}`
              : "No time set"}
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-bold">Location</h3>
          <p className="text-sm">{location || "No location set"}</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-bold">Attendees</h3>
          <div className="flex flex-wrap gap-2">
            {attendees?.map((attendee, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {attendee
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold">{attendee}</p>
                  <p className="text-xs text-muted-foreground">
                    {attendee.toLowerCase().split(" ").join("_")}@company.com
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
