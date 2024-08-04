"use theme";

import { CheckIcon, GithubIcon, MoonStarIcon, SunIcon } from "lucide-react";
import { Button } from "./Button";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

export const Header = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      name: "Light",
      value: "light",
    },
    {
      name: "Dark",
      value: "dark",
    },
    {
      name: "System",
      value: "system",
    },
  ];

  const renderThemeIcon = () => {
    if (theme === "light") {
      return <SunIcon size={16} />;
    }

    if (theme === "dark") {
      return <MoonStarIcon size={16} />;
    }

    return <SunIcon size={16} />;
  };

  return (
    <div className="flex justify-between">
      <span>Covid 19 - Live Statistics</span>

      <div className="flex gap-1">
        <Link href={"https://www.github.com/oztsinan"} target="_blank">
          <Button size="icon">
            <GithubIcon size={16} />
          </Button>
        </Link>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              {renderThemeIcon()}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="text-sm flex flex-col w-[120px] p-[7px]"
            align="end"
          >
            {themes?.map((item, index) => (
              <div
                key={index}
                className="hover:bg-secondary p-1.5 cursor-pointer transition-all rounded-sm flex gap-1 items-center"
                onClick={() => {
                  setTheme(item?.value);
                }}
              >
                {theme === item?.value && <CheckIcon size={16} />}
                {item?.name}
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
