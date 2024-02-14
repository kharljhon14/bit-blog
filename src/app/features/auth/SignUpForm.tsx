import PasswordInput from '@/components/customs/PasswordInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function SignUpForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="space-y-2">
            <Input placeholder="Username" />
            <PasswordInput placeholder="Password" />
            <PasswordInput placeholder="Confirm password" />
          </div>

          <Button className="mt-4 w-full">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}
