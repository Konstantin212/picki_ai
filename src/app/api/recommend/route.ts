import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Get user session
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { productType, purpose, budget, parameters, customPurpose } = body;

    // Validate required fields
    if (!productType || !purpose || !budget || !parameters || parameters.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate budget
    if (typeof budget !== 'number' || budget <= 0) {
      return NextResponse.json({ error: 'Invalid budget' }, { status: 400 });
    }

    // Validate parameters
    if (!Array.isArray(parameters) || parameters.length > 3) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    // TODO: Integrate with AI service for actual recommendations
    // For now, return mock data
    const mockRecommendations = generateMockRecommendations(
      productType,
      purpose,
      budget,
      parameters,
      customPurpose
    );

    // Save recommendation to database (optional)
    const { data: recommendation, error: dbError } = await supabase
      .from('recommendations')
      .insert({
        user_id: user.id,
        product_type: productType,
        purpose: purpose,
        budget: budget,
        parameters: parameters,
        custom_purpose: customPurpose,
        recommendations: mockRecommendations,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      // Continue without saving to database for now
    }

    return NextResponse.json({
      id: recommendation?.id || 'mock-id',
      recommendations: mockRecommendations,
      message: 'Recommendations generated successfully',
    });
  } catch (error) {
    console.error('Recommendation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function generateMockRecommendations(
  productType: string,
  purpose: string,
  budget: number,
  parameters: string[],
  customPurpose?: string
) {
  // Use custom purpose if provided
  const finalPurpose = customPurpose || purpose;

  // Mock recommendation logic based on inputs
  const baseRecommendations = [
    {
      id: 1,
      name: 'Premium Option',
      brand: 'TopBrand',
      price: Math.round(budget * 0.9),
      rating: 4.8,
      description: `High-end ${productType} perfect for ${finalPurpose}`,
      image: '/images/mock-product-1.jpg',
      features: parameters.map((param) => `${param} optimized`),
      pros: ['Excellent performance', 'Great value', 'Highly rated'],
      cons: ['Premium price', 'Limited availability'],
    },
    {
      id: 2,
      name: 'Balanced Choice',
      brand: 'MidRange',
      price: Math.round(budget * 0.6),
      rating: 4.5,
      description: `Well-rounded ${productType} for ${finalPurpose}`,
      image: '/images/mock-product-2.jpg',
      features: parameters.map((param) => `Good ${param}`),
      pros: ['Good value', 'Reliable', 'Widely available'],
      cons: ['Not premium', 'Average performance'],
    },
    {
      id: 3,
      name: 'Budget Friendly',
      brand: 'ValueBrand',
      price: Math.round(budget * 0.4),
      rating: 4.2,
      description: `Affordable ${productType} for ${finalPurpose}`,
      image: '/images/mock-product-3.jpg',
      features: parameters.map((param) => `Basic ${param}`),
      pros: ['Very affordable', 'Good for basics', 'Easy to find'],
      cons: ['Limited features', 'Lower quality'],
    },
  ];

  // Adjust recommendations based on parameters
  if (parameters.includes('performance') && baseRecommendations[0]) {
    baseRecommendations[0].rating = 4.9;
    baseRecommendations[0].pros.push('Exceptional performance');
  }

  if (parameters.includes('battery')) {
    if (baseRecommendations[0]) {
      baseRecommendations[0].features.push('Long battery life');
    }
    if (baseRecommendations[1]) {
      baseRecommendations[1].features.push('Good battery life');
    }
  }

  if (parameters.includes('camera')) {
    if (baseRecommendations[0]) {
      baseRecommendations[0].features.push('Professional camera');
    }
    if (baseRecommendations[1]) {
      baseRecommendations[1].features.push('Good camera quality');
    }
  }

  return baseRecommendations;
}

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Implement logic to fetch user's previous recommendations
    return NextResponse.json({ message: 'Recommendation history endpoint' });
  } catch (error) {
    console.error('Recommendation history API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
