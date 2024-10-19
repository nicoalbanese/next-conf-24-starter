import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Attendee {
  name: string
  email: string
  avatar: string
}

interface AppointmentDetailsProps {
  title: string
  date: string
  startTime: string
  endTime: string
  location: string
  attendees: Attendee[]
}

export function AppointmentDetails({
  title,
  date,
  startTime,
  endTime,
  location,
  attendees
}: AppointmentDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Title</h3>
          <p className="text-sm">{title || "No title set"}</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Date & Time</h3>
          <p className="text-sm">
            {date ? `${date}, ` : ""}
            {startTime && endTime
              ? `${startTime} - ${endTime}`
              : "No time set"}
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Location</h3>
          <p className="text-sm">{location || "No location set"}</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Attendees</h3>
          <div className="flex flex-wrap gap-2">
            {attendees.map((attendee, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={attendee.avatar} alt={attendee.name} />
                  <AvatarFallback>{attendee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{attendee.name}</p>
                  <p className="text-xs text-muted-foreground">{attendee.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}