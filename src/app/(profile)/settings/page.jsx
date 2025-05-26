import { Button } from "@/components/button";
import { Checkbox, CheckboxField } from "@/components/checkbox";
import { Label } from "@/components/fieldset";
import { Heading, Subheading } from "@/components/heading";
import { Select } from "@/components/select";
import { Text } from "@/components/text";

export const metadata = {
  title: "Settings",
};

export default function Settings() {
  return (
    <form method="post" className="container mx-auto p-4 max-w-4xl">
      <div className="mb-8">
        <Heading className="text-3xl font-bold text-gray-900">Settings</Heading>
        <Text className="mt-2 text-sm text-gray-600">Manage your account preferences.</Text>
      </div>

      {/* Account Email */}
      <section className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-4 w-full">
          <div className="space-y-1 flex-1">
            <Subheading className="text-lg font-semibold text-gray-900">Account</Subheading>
            <Text className="text-sm text-gray-600">
              Email: ochiengpaul001@gmail.com
              <br />
              You can't change your email because it is used to sign you in and to be contacted by employers.
            </Text>
          </div>
        </div>
      </section>

      {/* Personalization */}
      <section className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-4 w-full">
          <div className="space-y-1 flex-1">
            <Subheading className="text-lg font-semibold text-gray-900">Personalization</Subheading>
            <Text className="text-sm text-gray-600">Receive job recommendations and news from top employers.</Text>
          </div>
          <div className="w-full md:w-auto max-w-md mt-4 md:mt-0">
            <Select
              aria-label="Job recommendations frequency"
              name="job_recommendations"
              defaultValue="never"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm text-gray-900"
            >
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
              <option value="if_relevant">If relevant jobs are posted</option>
              <option value="never">Never</option>
            </Select>
          </div>
        </div>
      </section>

      {/* Promote Your Profile */}
      <section className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-4 w-full">
          <div className="space-y-1 flex-1">
            <Subheading className="text-lg font-semibold text-gray-900">Promote Your Profile</Subheading>
            <Text className="text-sm text-gray-600">Control how recruiters and employers interact with your profile.</Text>
          </div>
          <div className="w-full md:w-auto max-w-md mt-4 md:mt-0 space-y-4">
            <CheckboxField>
              <Checkbox name="profile_visible" defaultChecked className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded" />
              <Label className="text-sm text-gray-700 ml-2">Make your profile visible to recruiters</Label>
            </CheckboxField>
            <CheckboxField>
              <Checkbox name="allow_contact" defaultChecked className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded" />
              <Label className="text-sm text-gray-700 ml-2">Allow employers to contact you about relevant jobs</Label>
            </CheckboxField>
          </div>
        </div>
      </section>

      {/* Delete Your Account */}
      <section className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-4 w-full">
          <div className="space-y-1 flex-1">
            <Subheading className="text-lg font-semibold text-gray-900">Delete Your Account</Subheading>
            <Text className="text-sm text-gray-600">
              We'll delete your profile, saved jobs, and job history. We won't delete any applications you've sent to jobs on this board.
            </Text>
          </div>
          <div className="w-full md:w-auto max-w-md mt-4 md:mt-0">
            <Button
              type="button"
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-8">
        <Button
          type="reset"
          plain
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors text-sm"
        >
          Reset
        </Button>
        <Button
          type="submit"
          className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors text-sm"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}