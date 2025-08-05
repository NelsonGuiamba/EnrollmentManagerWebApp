"use client";
import { Card, CardBody } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import {
  FiStar as Star,
  FiUsers as Users,
  FiBookOpen as BookOpen,
  FiAward as Award,
  FiHeart as Heart,
  FiTarget as Target,
} from "react-icons/fi";

export default function Component() {
  return (
    <main className="flex-1 ">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary-50 px-6">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2 flex flex-col gap-4">
                <div className="w-fit bg-secondary-100 text-secondary-800 hover:bg-secondary-200 rounded-md border px-2 py-0.5 text-xs font-medium border-transparent">
                  Excellence in Education Since 1995
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary-700">
                  Nurturing Young Minds from{" "}
                  <span className="text-primary-600">First to Fifth Year</span>
                </h1>
                <p className="max-w-[600px] text-primary-600 md:text-xl">
                  At Bright Future Academy, we provide exceptional education
                  with dedicated teachers, innovative programs, and a supportive
                  environment that helps every student reach their full
                  potential.
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm text-primary-600">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>500+ Students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  <span>Award Winning</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
            <Image
              alt="Students learning in classroom"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
              height="600"
              src="/images/placeholder-srt0h.png"
              width="600"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 px-4" id="about">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-700 pb-3">
                Why Choose Bright Future Academy?
              </h2>
              <p className="max-w-[900px] text-primary-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We&apos;re committed to providing the highest quality education
                for students from first to fifth year, with a focus on academic
                excellence, character development, and preparing students for
                their bright futures.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <Card className="border-2 hover:border-secondary-200 transition-colors">
              <CardBody className="flex flex-col items-center space-y-4 p-6">
                <BookOpen className="h-12 w-12 text-secondary-600" />
                <h3 className="text-xl font-bold text-center text-primary-700">
                  Comprehensive Curriculum
                </h3>
                <p className="text-primary-600 text-center">
                  Our structured curriculum covers all essential subjects with
                  innovative teaching methods tailored for each year level from
                  first to fifth year.
                </p>
              </CardBody>
            </Card>
            <Card className="border-2 hover:border-secondary-200 transition-colors">
              <CardBody className="flex flex-col items-center space-y-4 p-6">
                <Heart className="h-12 w-12 text-secondary-600" />
                <h3 className="text-xl font-bold text-center text-primary-700">
                  Caring Environment
                </h3>
                <p className="text-primary-600 text-center">
                  We foster a nurturing, inclusive environment where every
                  student feels valued, supported, and encouraged to explore
                  their potential.
                </p>
              </CardBody>
            </Card>
            <Card className="border-2 hover:border-secondary-200 transition-colors">
              <CardBody className="flex flex-col items-center space-y-4 p-6">
                <Target className="h-12 w-12 text-secondary-600" />
                <h3 className="text-xl font-bold text-center text-primary-700">
                  Individual Attention
                </h3>
                <p className="text-primary-600 text-center">
                  Small class sizes ensure personalized attention for each
                  student, helping them overcome challenges and celebrate
                  achievements.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section
        className="w-full py-12 md:py-24 lg:py-32 bg-primary-50 px-4 "
        id="programs"
      >
        <div className=" px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-700 pb-3">
                Our Year Programs
              </h2>
              <p className="max-w-[900px] text-primary-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Structured learning paths designed to build knowledge
                progressively from first year through fifth year.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="grid gap-6 ">
              <Card className="">
                <CardBody className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-fit  bg-green-100 text-green-800 hover:bg-green-200 rounded-md border px-2 py-0.5 text-xs font-medium border-transparent">
                      Years 1-2
                    </div>
                    <h3 className="text-xl font-bold">Foundation Years</h3>
                  </div>
                  <p className="text-primary-600 mb-4">
                    Building essential literacy, numeracy, and social skills
                    through play-based learning and structured activities that
                    make learning fun and engaging.
                  </p>
                  <ul className="space-y-2 text-sm text-primary-600">
                    <li>• Reading and writing fundamentals</li>
                    <li>• Basic mathematics concepts</li>
                    <li>• Creative arts and expression</li>
                    <li>• Social skills development</li>
                  </ul>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-fit bg-orange-100 text-orange-800 hover:bg-orange-200 rounded-md border px-2 py-0.5 text-xs font-medium border-transparent">
                      Years 4-5
                    </div>
                    <h3 className="text-xl font-bold">Advanced Learning</h3>
                  </div>
                  <p className="text-primary-600 mb-4">
                    Preparing students for higher education with advanced
                    concepts, critical thinking, and specialized subjects that
                    challenge and inspire.
                  </p>
                  <ul className="space-y-2 text-sm text-primary-600">
                    <li>• Advanced mathematics and sciences</li>
                    <li>• Research and analytical skills</li>
                    <li>• Leadership opportunities</li>
                    <li>• Career guidance and preparation</li>
                  </ul>
                </CardBody>
              </Card>
            </div>
            <div className="flex flex-col justify-center">
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-fit bg-lime-100 text-lime-800 hover:bg-lime-200 rounded-md border px-2 py-0.5 text-xs font-medium border-transparent">
                      Year 3
                    </div>
                    <h3 className="text-xl font-bold">Development Year</h3>
                  </div>
                  <p className="text-primary-600 mb-4">
                    The crucial middle year where students consolidate their
                    foundation skills and begin exploring more complex subjects
                    and concepts.
                  </p>
                  <ul className="space-y-2 text-sm text-primary-600">
                    <li>• Enhanced literacy and numeracy</li>
                    <li>• Introduction to sciences</li>
                    <li>• Technology integration</li>
                    <li>• Independent learning skills</li>
                  </ul>
                </CardBody>
              </Card>

              <Image
                alt="Students collaborating"
                className="mt-6 aspect-[4/3] overflow-hidden rounded-xl object-cover"
                height="300"
                src="/images/collaborative-student-projects.png"
                width="400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 px-4" id="teachers">
        <div className=" px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center w-full">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-700 pb-3">
                Meet Our Exceptional Teachers
              </h2>
              <p className="max-w-[900px] text-primary-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our dedicated educators bring passion, expertise, and years of
                experience to inspire and guide every student.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl gap-6 py-12 lg:grid-cols-3 lg:gap-8">
            <Card className=" border-2 hover:border-secondary-200 transition-colors">
              <CardBody className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <Image
                    alt="Ms. Sarah Johnson"
                    className="rounded-full object-cover"
                    height="120"
                    src="/images/smiling-female-teacher.png"
                    width="120"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold">Ms. Sarah Johnson</h3>
                    <p className="text-secondary-600 font-medium">
                      First & Second Year Coordinator
                    </p>
                    <p className="text-sm text-primary-600 mt-2">
                      15 years experience
                    </p>
                  </div>
                  <p className="text-primary-600 text-center text-sm">
                    Specializes in early childhood education with a passion for
                    making learning fun and engaging. Known for her creative
                    teaching methods and nurturing approach.
                  </p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className=" border-2 hover:border-secondary-200 transition-colors">
              <CardBody className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <Image
                    alt="Mr. David Chen"
                    className="rounded-full object-cover"
                    height="120"
                    src="/images/male-teacher-glasses.png"
                    width="120"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold">Mr. David Chen</h3>
                    <p className="text-secondary-600 font-medium">
                      Mathematics & Science Teacher
                    </p>
                    <p className="text-sm text-primary-600 mt-2">
                      12 years experience
                    </p>
                  </div>
                  <p className="text-primary-600 text-center text-sm">
                    Expert in making complex mathematical and scientific
                    concepts accessible to students. Winner of the Excellence in
                    Teaching Award 2023.
                  </p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="border-2 hover:border-secondary-200 transition-colors">
              <CardBody className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <Image
                    alt="Ms. Emily Rodriguez"
                    className="rounded-full object-cover"
                    height="120"
                    src="/images/professional-teacher-curly-hair.png"
                    width="120"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold">Ms. Emily Rodriguez</h3>
                    <p className="text-secondary-600 font-medium">
                      Language Arts & Literature
                    </p>
                    <p className="text-sm text-primary-600 mt-2">
                      10 years experience
                    </p>
                  </div>
                  <p className="text-primary-600 text-center text-sm">
                    Passionate about developing students&apos; communication
                    skills and love for literature. Leads the school&apos;s
                    debate team and creative writing club.
                  </p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="w-full py-12 md:py-24 lg:py-32 bg-primary-50 px-4"
        id="testimonials"
      >
        <div className=" px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-700 pb-3">
                What Parents & Students Say
              </h2>
              <p className="max-w-[900px] text-primary-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from our school community about their experiences at Bright
                Future Academy.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl gap-6 py-12 lg:grid-cols-2 lg:gap-8">
            <Card className="">
              <CardBody className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-primary-600 mb-4">
                  &quot;Bright Future Academy has been incredible for our
                  daughter Emma. She started in first year and is now in her
                  fourth year. The teachers are so dedicated and caring, and
                  we&apos;ve seen tremendous growth in her confidence and
                  academic abilities.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    alt="Jennifer Martinez"
                    className="rounded-full object-cover"
                    height="40"
                    src="/images/smiling-parent-woman.png"
                    width="40"
                  />
                  <div>
                    <p className="font-semibold">Jennifer Martinez</p>
                    <p className="text-sm text-primary-600">
                      Parent of Emma (4th Year)
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="">
              <CardBody className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-primary-600 mb-4">
                  &quot;I love coming to school every day! My teachers make
                  learning so much fun, and I have made so many friends. Math
                  used to be hard for me, but Mr. Chen makes it easy to
                  understand. I can&apos;t wait to start fifth year next
                  year!&quot;
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    alt="Alex Thompson"
                    className="rounded-full object-cover"
                    height="40"
                    src="/images/happy-student-boy.png"
                    width="40"
                  />
                  <div>
                    <p className="font-semibold">Alex Thompson</p>
                    <p className="text-sm text-primary-600">4th Year Student</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="">
              <CardBody className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-primary-600 mb-4">
                  &quot;As educators ourselves, we were very selective about our
                  son&apos;s school. Bright Future Academy exceeded our
                  expectations. The curriculum is well-structured, and the
                  individual attention each student receives is
                  remarkable.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    alt="Dr. Michael & Lisa Wong"
                    className="rounded-full object-cover"
                    height="40"
                    src="/images/professional-parent-couple.png"
                    width="40"
                  />
                  <div>
                    <p className="font-semibold">Dr. Michael & Lisa Wong</p>
                    <p className="text-sm text-primary-600">
                      Parents of James (2nd Year)
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="">
              <CardBody className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-primary-600 mb-4">
                  &quot;The transition from third to fourth year was seamless
                  thanks to the excellent preparation and support from the
                  teachers. My daughter is now thriving in her advanced subjects
                  and has developed a real love for learning.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    alt="Rachel Green"
                    className="rounded-full object-cover"
                    height="40"
                    src="/images/smiling-mother-daughter.png"
                    width="40"
                  />
                  <div>
                    <p className="font-semibold">Rachel Green</p>
                    <p className="text-sm text-primary-600">
                      Parent of Sophie (4th Year)
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex items-center justify-center flex-col py-8 h-full gap-7 px-4">
        <p className="text-2xl font-semibold text-center flex flex-col gap-1">
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Ready to Join Our School Family?
          </span>
          <br />
          <span>
            {" "}
            Give your child the best start in their educational journey. <br />
            Enroll now for the upcoming academic year.
          </span>
        </p>

        <div className="relative inline-flex  group">
          <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt" />
          <Link
            className="relative inline-flex items-center justify-center px-7 py-3 text-lg font-bold dark:text-white transition-all duration-200 bg-[#f9f7fd] dark:bg-gray-900 font-pj rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            href="/register"
            role="button"
            title="Get quote now"
          >
            Enroll your children now
          </Link>
        </div>
      </section>
    </main>
  );
}
