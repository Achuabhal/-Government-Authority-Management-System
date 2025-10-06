import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BdaImage from "../../src/assets/image.png"; // 👈 your image import

const AboutSection = () => {
  return (
    <section className="py-14 sm:py-16 bg-gradient-to-br from-muted/30 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* About Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
              ABOUT BANGALORE DEVELOPMENT AUTHORITY
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p>
                The Bangalore Development Authority (BDA) came into being with
                effect from 6th January 1976 under a separate Act of the State
                Legislature viz. the BDA Act 1976. This Authority combined in
                itself the Planning functions of the City Planning Authority and
                the developmental functions of the erstwhile CITB.
              </p>
              <p>
                The Bangalore Development Authority came into existence in 1976
                as a successor to the erstwhile City Improvement Trust Board.
                Development of Bangalore in a planned manner, creating quality
                infrastructure, provision of sites and services and catering to
                the housing needs of the underprivileged are the focus areas of
                the BDA.
              </p>
              <p>
                Since inception, the BDA has allotted 76,000 sites to
                individuals for construction of residential dwellings. In
                addition, more than 800 civic amenity sites have been given for
                use by various public utilities, as also organisations, catering
                to the felt needs of the particular locality.
              </p>
              <p>
                B.D.A. Cadre and Recruitment Rules have been revised and sent to
                Government for approval during April 2001.
              </p>
            </div>

            
          </div>

          {/* Image instead of Cards */}
          <div className="flex justify-center">
            <img
               src="https://i.postimg.cc/zv0kJs3M/image.png"
              alt="Bangalore Development Authority"
              className="rounded-2xl shadow-lg object-cover w-full h-auto max-h-[450px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
