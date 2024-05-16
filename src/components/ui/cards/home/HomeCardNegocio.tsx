import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Link,
  Divider,
} from "@nextui-org/react";
import React, { ReactNode } from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

interface Props {
  title: string;
  children?: ReactNode;
  buttonText: string;
  buttonLink: string;
  icon: ReactNode;
}

export const HomeNegocioCard = ({
  title,
  children,
  buttonText,
  buttonLink,
  icon,
}: Props) => {
  return (
    <>
      <Card className="p-6">
        <CardHeader>{icon}</CardHeader>
        <CardBody>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {children}
        </CardBody>
        <Divider />
        <CardFooter>
          <Link href={buttonLink}>
            <Button
              color="secondary"
              endContent={<FaRegArrowAltCircleRight size={20} />}
            >
              {buttonText}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};
