const services = [
  "Web Development",
  "Brand Identity",
  "Software Engineering",
  "UI / UX Design",
  "Mobile Apps",
  "Strategy & Consulting",
];

// Doubled for seamless infinite loop
const loopedServices = [...services, ...services];

const Marquee = () => {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {loopedServices.map((service, index) => (
          <span className="marquee-item" key={index}>
            {service} <span className="marquee-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
