import { Body, Container, Head, Hr, Html, Preview, Section, Text } from "@react-email/components";

type ContactEmailProps = {
  name: string;
  email: string;
  message: string;
};

export default function ContactEmail({ name, email, message }: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New neural inquiry from {name}</Preview>
      <Body style={{ backgroundColor: "#05060a", padding: "32px" }}>
        <Container style={{ backgroundColor: "#0e1c24", borderRadius: "16px", padding: "32px", color: "#f2eee4" }}>
          <Section>
            <Text style={{ fontSize: "20px", fontWeight: 600 }}>New Signal Received</Text>
            <Text style={{ fontSize: "16px", color: "#9fb1c1" }}>
              {name} ({email}) sent the following message:
            </Text>
          </Section>
          <Hr style={{ borderColor: "#17202b" }} />
          <Section>
            <Text style={{ whiteSpace: "pre-line", fontSize: "16px", lineHeight: 1.5 }}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
