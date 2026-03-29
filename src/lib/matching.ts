import { Business, MatchedProgram, BusinessStage, BusinessNeed } from '@/types';
import { resources } from '@/data/resources';

interface MatchWeights {
  stage: Record<string, number>;
  needs: Record<string, number>;
  tourism: number;
}

const programWeights: Record<string, MatchWeights> = {
  'starter-company-plus': {
    stage: { emerging: 30, stabilizing: 10, growth: 0 },
    needs: { funding: 30, mentorship: 20, training: 15, marketing: 5 },
    tourism: 0,
  },
  'enterprise-centre': {
    stage: { emerging: 25, stabilizing: 20, growth: 10 },
    needs: { mentorship: 25, training: 20, marketing: 10, zoning: 10, funding: 10 },
    tourism: 0,
  },
  'innovate-niagara': {
    stage: { emerging: 10, stabilizing: 25, growth: 25 },
    needs: { mentorship: 25, networking: 20, funding: 15, marketing: 10 },
    tourism: 0,
  },
  'venture-niagara': {
    stage: { emerging: 5, stabilizing: 15, growth: 30 },
    needs: { funding: 35, workspace: 10, training: 5 },
    tourism: 0,
  },
  'digital-main-street': {
    stage: { emerging: 15, stabilizing: 25, growth: 15 },
    needs: { digital: 35, marketing: 25, funding: 10 },
    tourism: 0,
  },
  'made-in-grimsby': {
    stage: { emerging: 15, stabilizing: 20, growth: 15 },
    needs: { marketing: 25, networking: 15 },
    tourism: 30,
  },
  'futurpreneur': {
    stage: { emerging: 30, stabilizing: 10, growth: 0 },
    needs: { funding: 30, mentorship: 25, training: 10 },
    tourism: 0,
  },
  'chamber-of-commerce': {
    stage: { emerging: 15, stabilizing: 25, growth: 20 },
    needs: { networking: 30, marketing: 15, mentorship: 10 },
    tourism: 10,
  },
  'brock-university': {
    stage: { emerging: 5, stabilizing: 15, growth: 30 },
    needs: { training: 15, mentorship: 10, workspace: 10 },
    tourism: 0,
  },
  'niagara-college': {
    stage: { emerging: 5, stabilizing: 15, growth: 30 },
    needs: { training: 15, digital: 10, workspace: 10 },
    tourism: 0,
  },
};

export function matchPrograms(business: Business): MatchedProgram[] {
  const matched: MatchedProgram[] = [];

  for (const resource of resources) {
    const weights = programWeights[resource.slug];
    if (!weights) continue;

    let score = 0;
    const reasons: string[] = [];

    // Stage matching
    const stageScore = weights.stage[business.stage] || 0;
    if (stageScore > 0) {
      score += stageScore;
      const stageLabels: Record<BusinessStage, string> = {
        emerging: 'early-stage businesses',
        stabilizing: 'businesses in the stabilizing phase',
        growth: 'businesses ready to scale',
      };
      reasons.push(`Well suited for ${stageLabels[business.stage]}`);
    }

    // Needs matching
    for (const need of business.needs) {
      const needScore = weights.needs[need as string] || 0;
      if (needScore > 0) {
        score += needScore;
        const needLabels: Record<BusinessNeed, string> = {
          funding: 'funding support',
          mentorship: 'mentorship',
          workspace: 'workspace solutions',
          marketing: 'marketing assistance',
          networking: 'networking opportunities',
          zoning: 'zoning guidance',
          digital: 'digital transformation',
          training: 'training and education',
        };
        reasons.push(`Offers ${needLabels[need]}`);
      }
    }

    // Tourism matching
    if (business.tourismInterest.length > 0 && weights.tourism > 0) {
      score += weights.tourism;
      reasons.push('Connects you with local tourism opportunities');
    }

    // Normalize to percentage (cap at 98)
    const matchPercentage = Math.min(Math.round(score), 98);

    if (matchPercentage > 0) {
      matched.push({
        resource,
        matchPercentage,
        reasons: [...new Set(reasons)],
      });
    }
  }

  // Sort by match percentage descending
  matched.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return matched;
}
