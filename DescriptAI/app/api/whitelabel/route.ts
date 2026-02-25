import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

// White-label settings storage (in production, use database)
const whiteLabelSettings = new Map<string, {
  brandName: string;
  brandLogo: string;
  primaryColor: string;
  customDomain: string;
  removeBranding: boolean;
  customFooter: string;
  emailSupport: string;
}>();

// Get white-label settings
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = whiteLabelSettings.get(userId) || {
      brandName: "",
      brandLogo: "",
      primaryColor: "#6366f1",
      customDomain: "",
      removeBranding: false,
      customFooter: "",
      emailSupport: ""
    };

    return NextResponse.json({ 
      success: true,
      settings,
      available: true, // Indicates white-label is available for agency tier
      maxDomains: 3
    });
  } catch (error) {
    console.error("[WHITELABEL_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to get white-label settings" },
      { status: 500 }
    );
  }
}

// Save white-label settings
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      brandName,
      brandLogo,
      primaryColor,
      customDomain,
      removeBranding,
      customFooter,
      emailSupport
    } = await req.json();

    // Validate
    if (!brandName || brandName.length < 2) {
      return NextResponse.json(
        { error: "Brand name is required (min 2 characters)" },
        { status: 400 }
      );
    }

    // Save settings
    const settings = {
      brandName,
      brandLogo: brandLogo || "",
      primaryColor: primaryColor || "#6366f1",
      customDomain: customDomain || "",
      removeBranding: removeBranding || false,
      customFooter: customFooter || "",
      emailSupport: emailSupport || ""
    };

    whiteLabelSettings.set(userId, settings);

    return NextResponse.json({
      success: true,
      message: "White-label settings saved!",
      settings,
      nextSteps: customDomain ? [
        "Add CNAME record to your domain DNS",
        "Point to vercel.app",
        "Contact support for SSL setup"
      ] : []
    });
  } catch (error) {
    console.error("[WHITELABEL_SAVE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to save white-label settings" },
      { status: 500 }
    );
  }
}

// Delete white-label settings
export async function DELETE() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    whiteLabelSettings.delete(userId);

    return NextResponse.json({
      success: true,
      message: "White-label settings removed"
    });
  } catch (error) {
    console.error("[WHITELABEL_DELETE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to remove white-label settings" },
      { status: 500 }
    );
  }
}
