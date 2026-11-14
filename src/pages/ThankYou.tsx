import { useLocation, Link } from "react-router-dom";
import { CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Shown after a successful lead form submission.
 *  URL carries ?phone=XXXXXXXXXX (last 10 digits, no country code).
 */
const ThankYou = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const phone = params.get("phone");
  const displayPhone = phone ? `+91 ${phone}` : "the number you provided";

  return (
    <main className="min-h-[80vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Success icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <div>
          <h1 className="font-serif text-3xl md:text-4xl mb-3">
            Thank You — We'll Be in Touch!
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Your enquiry is confirmed. We will call you on{" "}
            <strong className="text-foreground">{displayPhone}</strong> within{" "}
            <strong className="text-foreground">24 hours</strong> to discuss your
            project.
          </p>
        </div>

        {/* What happens next */}
        <div className="bg-muted/60 rounded-xl p-6 text-left space-y-3 text-sm">
          <p className="font-semibold text-foreground mb-2">What happens next?</p>
          <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
            <li>Our team reviews your project details.</li>
            <li>We call you to understand your requirements better.</li>
            <li>We arrange a <strong>free site visit</strong> at a time convenient for you.</li>
            <li>You receive a detailed, no-obligation cost estimate.</li>
          </ol>
        </div>

        {/* If urgent */}
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            If it's urgent, reach us directly:
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+918091366650">
              <Button variant="outline" className="w-full sm:w-auto">
                <Phone className="w-4 h-4 mr-2" />
                Call +91 80913 66650
              </Button>
            </a>
            <a
              href="https://wa.me/918091366650?text=Hi%20Vidhima%2C%20I%20just%20submitted%20an%20enquiry%20and%20need%20urgent%20assistance."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full sm:w-auto bg-[hsl(142,70%,35%)] hover:bg-[hsl(142,70%,30%)] text-white">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>

        {/* Back to home */}
        <div>
          <Link to="/" className="text-sm text-primary hover:underline">
            ← Back to homepage
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ThankYou;
