export type ApiError = {
  errors: {
    path: string;
    code: string;
    message: string;
  }[];
};

export type IconProps = {
  color?: string;
  size?: string | number;
} & React.SVGAttributes<SVGElement>;
