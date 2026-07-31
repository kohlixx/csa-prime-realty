/**
 * CSA Prime Realty — Design System barrel.
 * One import site for the reusable UI kit. Extend as new atoms/molecules land.
 *
 * Usage:
 *   import { Button, Section, PropertyCard, FadeIn } from "@/components/design-system";
 */

/* ------------ Atoms (shadcn + luxury variants) ------------ */
export { Button, buttonVariants, type ButtonProps } from "./ui/button";
export { Badge, badgeVariants, type BadgeProps } from "./ui/badge";
export { Input, FloatingInput, inputVariants } from "./ui/input";
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants } from "./ui/card";
export { Skeleton, SkeletonPropertyCard, SkeletonText } from "./ui/skeleton";
export { PageLoader, InlineSpinner, BrandMarkLoader } from "./ui/page-loader";

/* ------------ Shared primitives ------------ */
export { Container, type ContainerProps } from "./shared/container";
export { Section, SectionHeader, type SectionProps, type SectionHeaderProps } from "./shared/section";
export { Image, type ImageProps } from "./shared/image";
export { Price } from "./shared/price";
export { Timeline, type TimelineItem } from "./shared/timeline";
export { FaqAccordion, type FaqItem } from "./shared/faq-accordion";
export {
  BlogCard, type BlogCardData,
  TestimonialCard, ReviewCard, type TestimonialCardData,
  StatsCard, type StatsCardData,
  FeatureCard, type FeatureCardData,
  PricingCard, type PricingCardData,
} from "./shared/content-cards";

/* ------------ Property domain ------------ */
export { PropertyCard, type PropertyCardData, type PropertyCardProps } from "./property/property-card";
export {
  BuilderCard, type BuilderCardData,
  LocationCard, type LocationCardData,
} from "./property/builder-location-card";

/* ------------ Search ------------ */
export { SearchBar, type SearchBarProps } from "./search/search-bar";

/* ------------ Layout organisms ------------ */
export {
  Navbar,
  type NavbarProps,
  type NavItem,
  type NavMegaColumn,
} from "./layout/navbar";
export { Footer, type FooterProps, type FooterColumn } from "./layout/footer";
export { FloatingContactDock, type FloatingContactDockProps } from "./layout/floating-contact-dock";

/* ------------ Forms ------------ */
export {
  NewsletterForm, type NewsletterFormProps,
  LeadForm, ContactForm, type LeadFormProps, type LeadFormValues,
} from "./forms/lead-forms";

/* ------------ Motion ------------ */
export {
  FadeIn, SlideUp, Stagger, Reveal, Counter, Parallax, Magnetic,
  type FadeInProps, type StaggerProps, type RevealProps, type CounterProps,
} from "./motion/motion-primitives";

/* ------------ Shadcn re-exports for convenience ------------ */
export { Toaster } from "./ui/sonner";
export { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetTrigger, SheetClose } from "./ui/sheet";
export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "./ui/dialog";
export { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerTrigger, DrawerClose } from "./ui/drawer";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
export { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
export { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
export { Select, SelectContent, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "./ui/select";
export { Checkbox } from "./ui/checkbox";
export { RadioGroup, RadioGroupItem } from "./ui/radio-group";
export { Switch } from "./ui/switch";
export { Slider } from "./ui/slider";
export { Separator } from "./ui/separator";
export { AspectRatio } from "./ui/aspect-ratio";
export { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
export { Progress } from "./ui/progress";
export { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
export { toast } from "sonner";

/* ------------ Admin kit ------------ */
export {
  StatusBadge, StatusBadgePreset, VisibilityBadge,
  FilterBar, BulkActionsBar, DataTable,
  type StatusBadgeProps, type StatusPreset, type StatusTone,
  type FilterBarProps, type FilterDefinition, type FilterOption, type FilterValues,
  type BulkAction, type BulkActionsBarProps,
  type DataTableProps, type DataTableColumn, type RowAction, type SortState, type SortDirection,
} from "./admin";
