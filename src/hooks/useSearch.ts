/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/router";
interface SearchOptions {
  fields?: string[];
  exact?: boolean;
}

export const useSearch = <T>(data: T[], options?: SearchOptions) => {
  const router = useRouter();
  const searchQuery = router.query.search as string;

  const filteredData = data.filter((item: any) => {
    if (!searchQuery) return true;

    const searchableProperties = options?.fields
      ? options.fields.map((field) => String(item[field]).toLowerCase())
      : Object.values(item).map((value) => String(value).toLowerCase());

    const searchTerm = searchQuery.toLowerCase();

    return options?.exact
      ? searchableProperties.some((prop) => prop === searchTerm)
      : searchableProperties.some((prop) => prop.includes(searchTerm));
  });

  return { filteredData, searchQuery };
};
