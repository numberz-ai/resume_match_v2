import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Users, 
  Calendar, 
  Plus, 
  Search,
  Filter,
  TrendingUp,
  Clock,
  Building2,
  ChevronDown
} from 'lucide-react';
import { mockJobs } from '../data/mockData';
import { Job } from '../types';

interface JobsListViewProps {
  onSelectJob: (jobId: string) => void;
  onPostJob: () => void;
}

export function JobsListView({ onSelectJob, onPostJob }: JobsListViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const departments = ['all', ...Array.from(new Set(mockJobs.map(job => job.department)))];

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    return matchesSearch && matchesDepartment && job.status === 'open';
  });

  const getTotalActiveCandidates = (job: Job) => {
    return job.pipeline.new + job.pipeline.screening + job.pipeline.interview + job.pipeline.offer;
  };

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'open': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'closed': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'draft': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getLevelColor = (level: Job['level']) => {
    switch (level) {
      case 'executive': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'lead': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'senior': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'mid': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'entry': return 'bg-teal-50 text-teal-700 border-teal-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatSalary = (job: Job) => {
    if (!job.salaryRange) return 'Competitive';
    const { min, max } = job.salaryRange;
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k USD`;
  };

  const getDaysOpen = (postedDate: string) => {
    const posted = new Date(postedDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-8 space-y-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-gray-900 mb-1">Open positions</h1>
              <p className="text-gray-600">
                {filteredJobs.length} jobs available
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white" onClick={onPostJob}>
              <Plus className="size-4 mr-2" />
              Post a job
            </Button>
          </div>
        </div>

        {/* Stats Bar - LinkedIn Style */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="bg-white border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active jobs</p>
                <p className="text-2xl text-gray-900 mt-1">
                  {mockJobs.filter(j => j.status === 'open').length}
                </p>
              </div>
              <div className="size-12 bg-teal-50 rounded-lg flex items-center justify-center">
                <Briefcase className="size-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="bg-white border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total openings</p>
                <p className="text-2xl text-gray-900 mt-1">
                  {mockJobs.reduce((sum, job) => sum + job.openings, 0)}
                </p>
              </div>
              <div className="size-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="size-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="bg-white border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active candidates</p>
                <p className="text-2xl text-gray-900 mt-1">
                  {mockJobs.reduce((sum, job) => sum + getTotalActiveCandidates(job), 0)}
                </p>
              </div>
              <div className="size-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="size-6 text-emerald-600" />
              </div>
            </div>
          </Card>

          <Card className="bg-white border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. time to fill</p>
                <p className="text-2xl text-gray-900 mt-1">
                  42 days
                </p>
              </div>
              <div className="size-12 bg-amber-50 rounded-lg flex items-center justify-center">
                <Clock className="size-6 text-amber-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters - LinkedIn Style */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <Input
              placeholder="Search by job title, department, or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white border-gray-300"
            />
          </div>
          
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {departments.map((dept) => (
              <motion.div
                key={dept}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <Button
                  variant={selectedDepartment === dept ? 'default' : 'outline'}
                  onClick={() => setSelectedDepartment(dept)}
                  className={selectedDepartment === dept ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-white border-gray-300 hover:bg-gray-50'}
                  size="sm"
                >
                  {dept === 'all' ? 'All departments' : dept}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Jobs List - LinkedIn Style */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.03, ease: [0.4, 0, 0.2, 1] }}
              >
                <Card 
                  className="p-6 hover:shadow-md transition-all duration-200 cursor-pointer bg-white border-gray-200 group"
                  onClick={() => onSelectJob(job.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: Company Logo Placeholder */}
                    <div className="size-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="size-7 text-gray-400" />
                    </div>

                    {/* Center: Job Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-gray-900 mb-1 group-hover:text-primary transition-colors duration-200">
                            {job.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">RecruiX</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={`${getStatusColor(job.status)} border`}>
                            {job.status}
                          </Badge>
                          {job.openings > 1 && (
                            <Badge variant="outline" className="border-gray-300">
                              {job.openings} openings
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Job Meta Info - LinkedIn Style */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="size-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="size-4" />
                          {formatSalary(job)}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Building2 className="size-4" />
                          {job.department}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Badge className={`${getLevelColor(job.level)} border text-xs`}>
                            {job.level}
                          </Badge>
                        </div>
                      </div>

                      {/* Pipeline Stats - Compact */}
                      <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="size-4 text-gray-400" />
                          <span className="text-gray-900">{getTotalActiveCandidates(job)}</span>
                          <span className="text-gray-600">active applicants</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="size-4 text-gray-400" />
                          Posted {getDaysOpen(job.postedDate)} days ago
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-gray-900">{job.pipeline.hired}</span>
                          hired
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-12 text-center bg-white border-gray-200">
              <div className="size-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="size-8 text-gray-300" />
              </div>
              <p className="text-gray-900 mb-2">No jobs found</p>
              <p className="text-gray-600 text-sm">
                Try adjusting your search or filters
              </p>
            </Card>
          </motion.div>
        )}
    </div>
  );
}