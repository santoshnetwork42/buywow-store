import SectionHeading from "@/components/common/SectionHeading";
import Slider from "@/components/features/Slider";
import TestimonialCard from "@/components/partials/Card/TestimonialCard";

const TestimonialSection = ({
  title,
  testimonials: { data: testimonials },
}) => {
  if (!testimonials?.length) return null;

  return (
    <section className="container-main mb-main">
      <SectionHeading title={title} />
      <Slider sliderClassName="gap-3 sm:gap-4 lg:gap-5">
        {testimonials.map((testimonial, index) => {
          const {
            name,
            age,
            webImage,
            mWebImage,
            description,
            concerns,
            product,
          } = testimonial?.attributes;
          return (
            <TestimonialCard
              key={`testimonial-${index}`}
              name={name}
              age={age}
              webImage={webImage}
              mWebImage={mWebImage}
              description={description}
              concerns={concerns}
              product={product}
            />
          );
        })}
      </Slider>
    </section>
  );
};

TestimonialSection.displayName = "TestimonialSection";

export default TestimonialSection;
