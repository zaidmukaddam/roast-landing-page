import { useState } from "react";

import { HStack, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import FileUploader from "@/components/FileUploader";
import RoastOutput from "@/components/RoastOutput";
import GithubButton from "@/components/GithubButton";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [roast, setRoast] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <NextSeo
        title="Roast Landing Page"
        description="I combined the new gpt-4 vision model to roast landing pages."
      />
      <VStack h="100vh" pt={{ base: 8, md: 32 }} spacing={6}>
        <Heading
          size={{
            base: "2xl",
            md: "4xl",
          }}
          color="black"
        >
          Roast Landing Page 🔥
        </Heading>

        <HStack fontSize={{ base: "md", md: "lg" }}>
          <Text p={4} py={3} fontWeight={700}>
            Made by {" "}<Link color="green" href="https://instagram.com/zaidmukaddam" isExternal>{" "}@zaidmukaddam</Link>
          </Text>
          <GithubButton />
        </HStack>
        <Text fontSize={{ base: "sm", md: "lg" }}>
          note: this is a joke, please don't take it seriously
        </Text>

        <FileUploader
          loading={loading}
          setImage={setImage}
          setRoast={setRoast}
          setLoading={setLoading}
        />
        <RoastOutput image={image} roast={roast} loading={loading} />
      </VStack>
    </>
  );
}
